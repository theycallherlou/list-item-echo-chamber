import { client } from './client';

export async function loadLists() {
  let { data: link_list_lists, error } = await client
  .from('link_list_lists')
  .select('*')
  
  if (error) throw error;

  return link_list_lists;
}

export async function createList(listName: string) {
  const { data, error } = await client
    .from('link_list_lists')
    .insert({ list_name: listName })
    .select();
  if (error) throw error;
  return data;
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
