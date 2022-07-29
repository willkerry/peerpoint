/* eslint-disable max-lines */
import { type LanguageName } from "@uiw/codemirror-extensions-langs";

export type Language = {
  id?: number;
  name: string;
  compiler?: string;
  cm?: LanguageName;
  image?: string;
  color?: string;
};

export const languageMap = new Map<number, Language>([
  [
    45,
    {
      name: "x86 Assembly",
      compiler: "Netwide Assembler 2.14.02",
      cm: "gas",
      image: "/logos/nasm.png",
      color: "blue",
    },
  ],
  [
    46,
    {
      name: "Bash",
      compiler: "5.0.0",
      cm: "shell",
      image: "/logos/bash.png",
      color: "gray",
    },
  ],
  [
    47,
    {
      name: "BASIC",
      compiler: "FreeBASIC 1.07.1",
      cm: "vb",
      image: "/logos/vb.png",
      color: "violet",
    },
  ],
  [
    75,
    {
      name: "C",
      compiler: "Clang 7.0.1",
      cm: "c",
      image: "/logos/c.png",
      color: "blue",
    },
  ],
  [
    54,
    {
      name: "C++",
      compiler: "Clang 7.0.1",
      cm: "cpp",
      image: "/logos/cpp.png",
      color: "indigo",
    },
  ],
  [
    51,
    {
      name: "C#",
      compiler: "Mono 6.6.0.161",
      cm: "csharp",
      image: "/logos/csharp.png",
      color: "lime",
    },
  ],
  [
    86,
    {
      name: "Clojure",
      compiler: "1.10.1",
      cm: "clojure",
      image: "/logos/clojure.png",
      color: "lime",
    },
  ],
  [
    55,
    {
      name: "Common Lisp",
      compiler: "SBCL 2.0.0",
      cm: "commonLisp",
      image: "/logos/lisp.png",
      color: "gray",
    },
  ],
  [
    77,
    {
      name: "COBOL",
      compiler: "GnuCOBOL 2.2",
      cm: "cobol",
      color: "gray",
    },
  ],
  [
    56,
    {
      name: "D",
      compiler: "DMD 2.089.1",
      cm: "d",
      image: "/logos/d.png",
      color: "red",
    },
  ],
  [
    57,
    {
      name: "Elixir",
      compiler: "1.9.4",
      image: "/logos/elixir.png",
      color: "violet",
    },
  ],
  [
    58,
    {
      name: "Erlang",
      compiler: "OTP 22.2",
      cm: "erlang",
      image: "/logos/erlang.png",
      color: "red",
    },
  ],
  [
    59,
    {
      name: "Fortran",
      compiler: "GFortran 9.2.0",
      cm: "fortran",
      image: "/logos/fortran.png",
      color: "grape",
    },
  ],
  [
    60,
    {
      name: "Go",
      compiler: "1.13.5",
      cm: "go",
      image: "/logos/go.png",
      color: "cyan",
    },
  ],
  [
    88,
    {
      name: "Groovy",
      compiler: "3.0.3",
      cm: "groovy",
      image: "/logos/groovy.png",
      color: "cyan",
    },
  ],
  [
    61,
    {
      name: "Haskell",
      compiler: "GHC 8.8.1",
      cm: "haskell",
      image: "/logos/haskell.png",
      color: "grape",
    },
  ],
  [
    62,
    {
      name: "Java",
      compiler: "OpenJDK 13.0.1",
      cm: "java",
      image: "/logos/java.png",
      color: "orange",
    },
  ],
  [
    63,
    {
      name: "JavaScript",
      compiler: "Node.js 12.14.0",
      cm: "javascript",
      image: "/logos/js.png",
      color: "yellow",
    },
  ],
  [
    78,
    {
      name: "Kotlin",
      compiler: "1.3.80",
      cm: "kotlin",
      image: "/logos/kotlin.png",
      color: "indigo",
    },
  ],
  [
    64,
    {
      name: "Lua",
      compiler: "5.3.5",
      cm: "lua",
      image: "/logos/lua.png",
      color: "indigo",
    },
  ],
  [
    79,
    {
      name: "Objective-C",
      compiler: "Clang 7.0.1",
      cm: "objectiveC",
      image: "/logos/objectivec.png",
      color: "indigo",
    },
  ],
  [
    65,
    {
      name: "OCaml",
      compiler: "4.09.0",
      image: "/logos/ocaml.png",
      color: "orange",
    },
  ],
  [
    66,
    {
      name: "Octave",
      compiler: "5.1.0",
      cm: "octave",
      image: "/logos/octave.png",
      color: "orange",
    },
  ],
  [
    67,
    {
      name: "Pascal",
      compiler: "FPC 3.0.4",
      cm: "pascal",
      image: "/logos/pascal.png",
      color: "yellow",
    },
  ],
  [
    85,
    {
      name: "Perl",
      compiler: "5.28.1",
      cm: "perl",
      image: "/logos/perl.png",
      color: "dark",
    },
  ],
  [
    68,
    {
      name: "PHP",
      compiler: "7.4.1",
      cm: "php",
      image: "/logos/php.png",
      color: "violet",
    },
  ],
  [
    69,
    {
      name: "Prolog",
      compiler: "GNU Prolog 1.4.5",
      image: "/logos/prolog.png",
      color: "orange",
    },
  ],
  [
    70,
    {
      name: "Python 2",
      compiler: "2.7.17",
      cm: "python",
      image: "/logos/py2.png",
      color: "gray",
    },
  ],
  [
    71,
    {
      name: "Python 3",
      compiler: "3.8.1",
      cm: "python",
      image: "/logos/py3.png",
      color: "yellow",
    },
  ],
  [
    80,
    {
      name: "R",
      compiler: "4.0.0",
      cm: "r",
      image: "/logos/r.png",
      color: "blue",
    },
  ],
  [
    72,
    {
      name: "Ruby",
      compiler: "2.7.0",
      cm: "ruby",
      image: "/logos/ruby.png",
      color: "red",
    },
  ],
  [
    73,
    {
      name: "Rust",
      compiler: "1.40.0",
      cm: "rust",
      image: "/logos/rust.png",
      color: "orange",
    },
  ],
  [
    81,
    {
      name: "Scala",
      compiler: "2.13.2",
      cm: "scala",
      image: "/logos/scala.png",
      color: "red",
    },
  ],
  [
    82,
    {
      name: "SQL",
      compiler: "SQLite 3.27.2",
      cm: "sql",
      image: "/logos/sqlite.png",
      color: "blue",
    },
  ],
  [
    83,
    {
      name: "Swift",
      compiler: "5.2.3",
      cm: "swift",
      image: "/logos/swift.png",
      color: "orange",
    },
  ],
  [
    74,
    {
      name: "TypeScript",
      compiler: "3.7.4",
      cm: "typescript",
      image: "/logos/ts.png",
      color: "blue",
    },
  ],
  [
    84,
    {
      name: "Visual Basic .NET",
      compiler: "vbnc 0.0.0.5943",
      cm: "vb",
      image: "/logos/basic.png",
      color: "blue",
    },
  ],
]);
