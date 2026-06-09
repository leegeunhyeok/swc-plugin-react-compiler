use react_compiler::entrypoint::plugin_options::{CompilerTarget, PluginOptions};
use swc_core::{
    common::{SourceMapper, Spanned},
    ecma::ast::{Module, Program},
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let Program::Module(module) = program else {
        return program;
    };

    transform_module(&module, &metadata).map_or(Program::Module(module), Program::Module)
}

fn transform_module(module: &Module, metadata: &TransformPluginProgramMetadata) -> Option<Module> {
    let source_text = metadata.source_map.span_to_snippet(module.span()).ok()?;

    react_compiler_swc::transform(module, &source_text, plugin_options(metadata)).module
}

fn plugin_options(metadata: &TransformPluginProgramMetadata) -> PluginOptions {
    let default_options = default_plugin_options();
    let Some(config) = metadata.get_transform_plugin_config() else {
        return default_options;
    };

    let Ok(config) = serde_json::from_str::<serde_json::Value>(&config) else {
        return default_options;
    };

    let Ok(mut options) = serde_json::to_value(&default_options) else {
        return default_options;
    };
    merge_json(&mut options, config);

    serde_json::from_value(options).unwrap_or(default_options)
}

fn default_plugin_options() -> PluginOptions {
    PluginOptions {
        should_compile: true,
        enable_reanimated: false,
        is_dev: false,
        filename: None,
        compilation_mode: "infer".to_string(),
        panic_threshold: "none".to_string(),
        target: CompilerTarget::Version("19".to_string()),
        gating: None,
        dynamic_gating: None,
        no_emit: false,
        output_mode: None,
        eslint_suppression_rules: None,
        flow_suppressions: true,
        ignore_use_no_forget: false,
        custom_opt_out_directives: None,
        environment: Default::default(),
        source_code: None,
        profiling: false,
        debug: false,
    }
}

fn merge_json(base: &mut serde_json::Value, overlay: serde_json::Value) {
    match (base, overlay) {
        (serde_json::Value::Object(base), serde_json::Value::Object(overlay)) => {
            for (key, value) in overlay {
                merge_json(base.entry(key).or_insert(serde_json::Value::Null), value);
            }
        }
        (base, overlay) => *base = overlay,
    }
}
