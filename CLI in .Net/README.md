# Code Bundler CLI

A .NET command-line utility that collects source files from a directory and bundles them into a single output file. It supports language filtering, configurable output formatting, sorting and reusable response-file generation.

## Key Features

- `bundle` command for combining source files
- Filter input by programming language or include all supported files
- Optional source-file names in the generated bundle
- Optional removal of empty lines
- Optional author header
- Alphabetical or extension-based sorting
- Short command aliases for CLI options
- `rsp` command for creating reusable response files
- Input validation and file-system error handling

## Tech Stack

- C#
- .NET 7
- `System.CommandLine`
- `System.IO`
- `StringBuilder`

## Supported Source Types

`cs`, `js`, `java`, `html`, `css`, `ts`, `jsx`, or `ALL`

## Example

```bash
dotnet run -- bundle --output ./src --l cs --note --author "Developer" --sort abc
```

The command scans the target directory, builds the combined content and writes it to `bundle.txt`.

## CLI Design

The application separates the workflow into focused operations for validation, content construction, sorting, file appending and output writing. The response-file workflow provides a second interaction mode for saving command configuration.

## What This Project Demonstrates

This project goes beyond standard CRUD development and demonstrates command-line API design, filesystem automation, option parsing, validation and configurable data-processing pipelines in C#/.NET.
