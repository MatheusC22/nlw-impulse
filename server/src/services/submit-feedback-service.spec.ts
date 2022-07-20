import { SubmitFeebackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', ()=>{
    const submitFeedback = new SubmitFeebackService(
        {create: createFeedbackSpy},
        {sendMail: sendMailSpy}
    )

    it('should be able to submit a feedback', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'test comment',
            screenshot: 'data:image/png;base64 duhasidhaiusdhauidhuidah'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    
    it('should not be able to submit a feedback without a type', async () =>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'test comment',
            screenshot: 'data:image/png;base64 duhasidhaiusdhauidhuidah'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64 duhasidhaiusdhauidhuidah'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'test comment',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    });
});