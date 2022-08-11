export const errorMessages: Map<number, string> = new Map([
  [4, "Your program ran but didn’t pass the test."],
  [5, "Your program took too long to run."], // TLE
  [6, "Your program couldn’t be compiled."], // CE
  [7, "Your program encountered a segmentation fault."], // SIGSEGV
  [8, "Your program exceeded the filesize limit."], // SIGXFSZ
  [9, "Your program encountered an arithmetic error."], // SIGFPE
  [10, "Your program aborted unexpectedly."], // SIGABRT
  [11, "Your program encountered a runtime error."], // NZEC
  [12, "Your program encountered a runtime error."], // other
  [13, "Internal Error"],
  [14, "Exec Format Error"],
]);
