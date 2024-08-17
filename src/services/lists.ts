import { client, checkError } from './client';
import { IList } from '../lib/types';

async function getAllLists() {
  try {
    const response = await client
      .from('link_list_lists')
      .select('*');
      return checkError(response);
  } catch (error) {
    console.error(`There was an error fetching the lists: ${error}`);
  }
}

async function createList(newList: IList) {
  try {
    const response = await client
      .from('link_list_lists')
      .insert(newList);
    return checkError(response);
  } catch (error) {
    console.error(`There was an error creating the list: ${error}`);
  }
}

async function deleteList(listId: string) {
  try {
    const response = await client
      .from('link_list_lists')
      .delete()
      .match({ listId });
    return checkError(response);
  } catch (error) {
    console.error(`There was an error deleting the list: ${error}`);
  }
}

async function updateList(listId: string, newList: IList) {
  try {
    const response = await client
      .from('link_list_lists')
      .update(newList)
      .match({ listId });
    return checkError(response);
  } catch (error) {
    console.error(`There was an error updating the list: ${error}`);
  }
}

export { getAllLists, createList, deleteList, updateList };
