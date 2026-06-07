use swc_core::{
    ecma::{
        ast::Program,
        visit::{VisitMut, VisitMutWith},
    },
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

#[derive(Default)]
struct ReactCompilerTransform;

impl VisitMut for ReactCompilerTransform {}

#[plugin_transform]
pub fn process_transform(
    mut program: Program,
    _metadata: TransformPluginProgramMetadata,
) -> Program {
    program.visit_mut_with(&mut ReactCompilerTransform);
    program
}
