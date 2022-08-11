type ErrorInfo = { description: string; help?: string };

export const errorMessages: Map<number, ErrorInfo> = new Map([
  [4, { description: "Your program ran but didn’t pass the test." }],
  [5, { description: "Your program took too long to run." }], // TLE
  [6, { description: "Your program couldn’t be compiled." }], // CE
  [7, { description: "Your program encountered a segmentation fault." }], // SIGSEGV
  [8, { description: "Your program exceeded the filesize limit." }], // SIGXFSZ
  [9, { description: "Your program encountered an arithmetic error." }], // SIGFPE
  [10, { description: "Your program aborted unexpectedly." }], // SIGABRT
  [11, { description: "Your program encountered a runtime error." }], // NZEC
  [12, { description: "Your program encountered a runtime error." }], // other
  [13, { description: "Internal Error" }],
  [14, { description: "Exec Format Error" }],
]);
