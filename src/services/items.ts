import { client, checkError } from './client';
import { IItem } from '../lib/types';

async function getAllItems() {
  try {
    const response = await client
      .from('link_list_items')
      .select('*');
    return checkError(response);
  } catch (error) {
    console.error(`There was an error fetching the items: ${error}`);
  }
}

async function createItem(newItem: IItem) {
  try {
    const response = await client
      .from('link_list_items')
      .insert(newItem);
    return checkError(response);
  } catch (error) {
    console.error(`There was an error creating the item: ${error}`);
  }
}

async function updateItem(updatedItem: IItem) {
  try {
    const response = await client
      .from('link_list_items')
      .update(updatedItem);
    return checkError(response);
  } catch (error) {
    console.error(`There was an error updating the item: ${error}`);
  }
}

async function deleteItem(itemId: string) {
  try {
    const response = await client
      .from('link_list_items')
      .delete()
      .match({ itemId });
    return checkError(response);
  } catch (error) {
    console.error(`There was an error deleting the item: ${error}`);
  }
}

export { getAllItems, createItem, updateItem, deleteItem };
