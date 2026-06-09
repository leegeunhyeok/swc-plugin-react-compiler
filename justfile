set shell := ["bash", "-uc"]

alias b := build
alias c := check
alias t := test

default:
    @just --list

setup:
    rustup target add wasm32-wasip1
    corepack enable
    yarn install --immutable

build: build-wasm

build-wasm:
    cargo build -p swc-plugin-react-compiler --target wasm32-wasip1 --release
    cp target/wasm32-wasip1/release/swc_plugin_react_compiler.wasm .

check: rust-check typecheck lint fmt-check

rust-check:
    cargo check --workspace --all-targets

typecheck:
    yarn tsc -b --pretty false

lint:
    yarn oxlint .

fmt-check:
    yarn oxfmt --check .

fmt:
    yarn oxfmt --write .

test: rust-test

rust-test:
    cargo test --workspace

example: build-wasm
    yarn workspace swc-plugin-react-compiler-example run build

example-dev: build-wasm
    yarn workspace swc-plugin-react-compiler-example run dev

clean:
    cargo clean
