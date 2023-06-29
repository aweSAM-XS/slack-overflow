import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {  Tag } from '../interfaces';
import { DatabaseHelper } from '../databaseHelper';

// Add Tag
export const addTag = async (req: Request, res: Response) => {
    try {
        let tag_id = uuid();
        const { tag_name, tag_description } = req.body;
        await DatabaseHelper.exec('CreateTag', {
            tag_id,
            tag_name,
            tag_description,
        });
        return res.status(201).json({ message: 'Tag created successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Tags
export const getAllTags = async (req: Request, res: Response) => {
    try {
        let tags: Tag[] = (await DatabaseHelper.exec('GetAllTags'))
            .recordset;
        return res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ message: error?.toString() });
    }
};

// Get Tag By Id
export const getTagById = async (req: Request, res: Response) => {
    try {
        const { tag_id } = req.params;
        let tag: Tag[] = (await DatabaseHelper.exec('GetTagByName', { tag_id }))
            .recordset[0];
        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ message: error?.toString() });
    }
};

// Get Tag By Name
export const getTagByName = async (req: Request, res: Response) => {
    try {
        const { tag_name } = req.params;
        let tag: Tag[] = (
            await DatabaseHelper.exec('GetTagByName', { tag_name })
        ).recordset[0];
        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ message: error?.toString() });
    }
};

// Update Tag
export const updateTag = async (req: Request, res: Response) => {
    try {
        let { tag_id } = req.params;
        const { tag_name, tag_description } = req.body;
        await DatabaseHelper.exec('UpdateTag', {
            tag_id,
            tag_name,
            tag_description,
        });
        return res.status(201).json({ message: 'Tag updated successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete Tag
export const deleteTag = async (req: Request, res: Response) => {
    try {
        const { tag_id } = req.params;
        await DatabaseHelper.exec('DeleteTag', { tag_id });
        return res.status(200).json({ message: 'Tag has been deleted' });
    } catch (error) {
        return res.status(500).json({ message: error?.toString() });
    }
};
