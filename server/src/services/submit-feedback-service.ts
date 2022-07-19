import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedback-repository";

interface SubmitFeebackServiceRequest {
    type: string,
    comment: string,
    screenshot?: string
}


export class SubmitFeebackService {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
        ) {
        this.mailAdapter = mailAdapter
        this.feedbacksRepository = feedbacksRepository
    }

    async execute(request: SubmitFeebackServiceRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style=""font-family: sans-serif; font-seze: 16px; color: #111>`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}