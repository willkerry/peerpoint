export type SubmissionResponse = {
	stdout: string;
	time: string;
	memory: number;
	stderr: string;
	token: string;
	compile_output: string;
	message: string;
	status: {
		id: number;
		description: string;
	};
};

export type SubmissionRequest = {
	language_id: number;
	source_code: string;
	expected_output?: string;
};
