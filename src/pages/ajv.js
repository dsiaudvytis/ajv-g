import React from 'react';
import styles from './ajv.module.css';
import { connect } from 'react-redux';

const handleFileUpload = (file, update) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const content = fileReader.result;
    try {
      JSON.parse(content);
      update(JSON.parse(content));
    } catch (error) {
      // if malformed JSON, throw error
      alert('You just posted cringe.')
    }
  };
  fileReader.readAsText(file);
}

export default connect(
  (({ sourceDoc }) => ({ sourceDoc })),
  {
    updateDoc: data => ({
      type: 'UPLOAD_SOURCE_DOC',
      data,
    }),
  },
)(({ sourceDoc, updateDoc }) => {
  return (
    <main className={styles.main}>
      <title>Main page</title>
      <h1>Hello World</h1>
      <label htmlFor="inputfile" className={styles.uploadLabel}>Upload JSON file</label>
      <input
        className={styles.hidden}
        type="file"
        name="inputfile"
        id="inputfile"
        accept="application/json"
        onChange={e => handleFileUpload(e.target.files[0], updateDoc)}
      />
    </main>
  )
});
