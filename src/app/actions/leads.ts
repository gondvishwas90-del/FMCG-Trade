'use server';

import dbConnect from '@/lib/db';
import Lead, { ILead } from '@/models/Lead';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

// --- Read All ---
export async function getLeads() {
    await dbConnect();
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        return { success: true, data: serializeList(leads) as ILead[] };
    } catch (error) {
        console.error('Error fetching leads:', error);
        return { success: false, error: 'Failed to fetch leads' };
    }
}

// --- Read Single ---
export async function getLeadById(id: string) {
    await dbConnect();
    try {
        const lead = await Lead.findById(id);
        if (!lead) return { success: false, error: 'Lead not found' };
        return { success: true, data: serializeDocument(lead) as ILead };
    } catch (error) {
        console.error('Error fetching lead:', error);
        return { success: false, error: 'Failed to fetch lead' };
    }
}

// --- Delete ---
export async function deleteLead(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const deleted = await Lead.findByIdAndDelete(id);
        if (!deleted) return { success: false, error: 'Lead not found' };
        revalidatePath('/admin/whatsapp-leads');
        return { success: true, message: 'Lead deleted successfully' };
    } catch (error) {
        console.error('Error deleting lead:', error);
        return { success: false, error: 'Failed to delete lead' };
    }
}

// --- Bulk Delete ---
export async function deleteLeads(ids: string[]) {
    await requireAdmin();
    await dbConnect();
    try {
        const result = await Lead.deleteMany({ _id: { $in: ids } });
        revalidatePath('/admin/whatsapp-leads');
        return { success: true, message: `${result.deletedCount} lead(s) deleted` };
    } catch (error) {
        console.error('Error deleting leads:', error);
        return { success: false, error: 'Failed to delete leads' };
    }
}
