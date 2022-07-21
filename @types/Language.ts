import { type LanguageName } from "@uiw/codemirror-extensions-langs";

export type Language = {
  id: number;
  name: string;
};

export const languages: Language[] = [
  { id: 45, name: "Assembly (NASM 2.14.02)" },
  { id: 46, name: "Bash (5.0.0)" },
  { id: 47, name: "Basic (FBC 1.07.1)" },
  { id: 48, name: "C (GCC 7.4.0)" },
  { id: 52, name: "C++ (GCC 7.4.0)" },
  { id: 49, name: "C (GCC 8.3.0)" },
  { id: 53, name: "C++ (GCC 8.3.0)" },
  { id: 50, name: "C (GCC 9.2.0)" },
  { id: 54, name: "C++ (GCC 9.2.0)" },
  { id: 51, name: "C# (Mono 6.6.0.161)" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
  { id: 56, name: "D (DMD 2.089.1)" },
  { id: 57, name: "Elixir (1.9.4)" },
  { id: 58, name: "Erlang (OTP 22.2)" },
  { id: 44, name: "Executable" },
  { id: 59, name: "Fortran (GFortran 9.2.0)" },
  { id: 60, name: "Go (1.13.5)" },
  { id: 61, name: "Haskell (GHC 8.8.1)" },
  { id: 62, name: "Java (OpenJDK 13.0.1)" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  { id: 64, name: "Lua (5.3.5)" },
  { id: 65, name: "OCaml (4.09.0)" },
  { id: 66, name: "Octave (5.1.0)" },
  { id: 67, name: "Pascal (FPC 3.0.4)" },
  { id: 68, name: "PHP (7.4.1)" },
  { id: 43, name: "Plain Text" },
  { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
  { id: 70, name: "Python (2.7.17)" },
  { id: 71, name: "Python (3.8.1)" },
  { id: 72, name: "Ruby (2.7.0)" },
  { id: 73, name: "Rust (1.40.0)" },
  { id: 74, name: "TypeScript (3.7.4)" },
];

export const usefulLanguages: ({
  compiler: string;
  cm?: LanguageName;
} & Language)[] = [
  { id: 45, name: "x86 Assembly", compiler: "NASM 2.14.02", cm: "gas" },
  { id: 46, name: "Bash", compiler: "5.0.0", cm: "shell" },
  { id: 47, name: "Basic", compiler: "FBC 1.07.1", cm: "vb" },
  { id: 50, name: "C", compiler: "GCC 9.2.0", cm: "c" },
  { id: 54, name: "C++", compiler: "GCC 9.2.0", cm: "cpp" },
  { id: 51, name: "C#", compiler: "Mono 6.6.0.161", cm: "csharp" },
  { id: 55, name: "Common Lisp", compiler: "SBCL 2.0.0", cm: "commonLisp" },
  { id: 56, name: "D", compiler: "DMD 2.089.1", cm: "d" },
  // { id: 57, name: "Elixir", compiler: "1.9.4" },
  { id: 58, name: "Erlang", compiler: "OTP 22.2", cm: "erlang" },
  { id: 59, name: "Fortran", compiler: "GFortran 9.2.0", cm: "fortran" },
  { id: 60, name: "Go", compiler: "1.13.5", cm: "go" },
  { id: 61, name: "Haskell", compiler: "GHC 8.8.1", cm: "haskell" },
  { id: 62, name: "Java", compiler: "OpenJDK 13.0.1", cm: "java" },
  { id: 63, name: "JavaScript", compiler: "Node.js 12.14.0", cm: "javascript" },
  { id: 64, name: "Lua", compiler: "5.3.5", cm: "lua" },
  // { id: 65, name: "OCaml", compiler: "4.09.0" },
  { id: 66, name: "Octave", compiler: "5.1.0", cm: "octave" },
  { id: 67, name: "Pascal", compiler: "FPC 3.0.4", cm: "pascal" },
  { id: 68, name: "PHP", compiler: "7.4.1", cm: "php" },
  // { id: 69, name: "Prolog", compiler: "GNU Prolog 1.4.5" },
  { id: 70, name: "Python 2", compiler: "2.7.17", cm: "python" },
  { id: 71, name: "Python 3", compiler: "3.8.1", cm: "python" },
  { id: 72, name: "Ruby", compiler: "2.7.0", cm: "ruby" },
  { id: 73, name: "Rust", compiler: "1.40.0", cm: "rust" },
  { id: 74, name: "TypeScript", compiler: "3.7.4", cm: "typescript" },
];
