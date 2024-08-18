import { client } from './client';
import { IList } from '../lib/types';

export async function loadLists() {
  let { data: link_list_lists, error } = await client
  .from('link_list_lists')
  .select('*')
  
  if (error) throw error;

  return link_list_lists;
}

export async function createList(newList: Omit<IList, 'id' | 'user_id'>): Promise<IList | null> {
  try {
    console.log('Attempting to create a new list with data:', newList);
    const { data, error } = await client
      .from('link_list_lists')
      .insert(newList)
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating list:', error.message);
      console.error('Full error details:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating list:', error);
    return null;
  }
}

export async function deleteList(listId: string) {
  const { data, error } = await client
    .from('link_list_lists')
    .delete()
    .eq('id', listId);
  if (error) throw error;
  return data;
}

export async function updateList(listId: string, listName: string) {
  const { data, error } = await client
    .from('link_list_lists')
    .update({ list_name: listName })
    .eq('id', listId);
  if (error) throw error;
  return data;
}
