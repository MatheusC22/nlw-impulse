import express from 'express'
import { prisma } from './prisma';
import nodemailer from 'nodemailer'
import { SubmitFeebackService } from './services/submit-feedback-service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapapter } from './adapters/nodemailer/node-mailer-mail-adapter';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapapter = new NodemailerMailAdapapter();
    const submitFeebackService = new SubmitFeebackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapapter
    )
    await submitFeebackService.execute({
        type,
        comment,
        screenshot
    });

    return res.status(201).send();

});
