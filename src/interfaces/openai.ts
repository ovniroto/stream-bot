interface ICompletionChoices {
    text: string
    index: number
    logprobs: number | null
    finish_reason: string
}

export interface IOpenAICompletion {
    id: string
    object: string
    created: number
    model: string
    choices: ICompletionChoices[]
    usage: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
    }
}