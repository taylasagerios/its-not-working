// TODO: Install the following package:ok
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    try {
        const db = await openDB('myDatabase', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('myObjectStore')) {
              db.createObjectStore('myObjectStore', { keyPath: 'id' });
            }
          },
        });
        console.log('Database initialized:', db.name);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    try {
        const db = await openDB('myDatabase', 1);
    
        const transaction = db.transaction('myObjectStore', 'readwrite');
        const objectStore = transaction.objectStore('myObjectStore');

        const record = { name, home, cell, email };
        const request = objectStore.put(record);

        await request;
    
        console.log('Record added:', record);
      } catch (error) {
        console.error('Failed to add record:', error);
      }
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    try {

        const db = await openDB('myDatabase', 1);

        const transaction = db.transaction('myObjectStore', 'readonly');
        const objectStore = transaction.objectStore('myObjectStore');

        const records = await objectStore.getAll();

        return records;
      } catch (error) {

        console.error('Failed to retrieve records:', error);
        return [];
      }  
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    try {

        const db = await openDB('myDatabase', 1);
    
        const transaction = db.transaction('myObjectStore', 'readwrite');
        const objectStore = transaction.objectStore('myObjectStore');

        const request = objectStore.delete(id);

        await request;

        console.log('Record deleted:', id);
      } catch (error) {

        console.error('Failed to delete record:', error);
      }  
};

initdb();
