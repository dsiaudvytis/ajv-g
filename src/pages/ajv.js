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
      alert('The uploaded file contains invalid JSON. It was ignored and lost to time');
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
      <h1 className={styles.header}>anotherJSONvalidator: {'{'} generator {'}'}</h1>
      <div className={styles.upload}>
        <label htmlFor="inputfile" className={styles.uploadLabel}>Upload JSON file</label>
        <input
          className={styles.hiddenInput}
          type="file"
          name="inputfile"
          id="inputfile"
          accept="application/json"
          onChange={e => handleFileUpload(e.target.files[0], updateDoc)}
        />
      </div>
      <div className={styles.source}>
        {!sourceDoc ? '' :
          <pre>
            {JSON.stringify(sourceDoc, true, 4)}
          </pre>
        }
      </div>
    </main>
  )
});
