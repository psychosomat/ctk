#!/usr/bin/env bun
import { readFileSync } from "node:fs";
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

function readInput(): string | null {
	const path = process.argv[2];
	if (path) return readFileSync(path, "utf8");
	return process.stdin.isTTY ? null : readFileSync(0, "utf8");
}

try {
	const text = readInput();
	if (text === null) {
		console.error("usage: ctk <file>");
		process.exit(1);
	}
	console.log(new Tiktoken(o200k_base).encode(text).length);
} catch (error) {
	console.error(`ctk: ${error instanceof Error ? error.message : error}`);
	process.exit(1);
}
