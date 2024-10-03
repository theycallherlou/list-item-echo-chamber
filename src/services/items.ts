import { client } from './client';
import { IItem } from '../lib/types';

export async function createItem(newItem: Omit<IItem, 'id'>): Promise<IItem | null> {
  try {
    const { data, error } = await client
      .from('link_list_items')
      .insert(newItem)
      .select()
      .single();

    if (error) {
      console.error('Supabase error adding item:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error adding item:', error);
    return null;
  }
}
