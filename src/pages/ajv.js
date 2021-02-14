import React from 'react';
import styles from './ajv.module.css';
import { connect } from 'react-redux';

const isComposite = v => typeof v === 'object' && v !== null;

const JSONObject = ({ data }) => (
  <div className={styles.outerObject}>
    {Object.entries(data).map(([k, v]) => (
      <div key={k}>
        <div className={styles.key}>{k}: </div>
        <div className={isComposite(v) ? '' : styles.value}>
          {{
            [true]: () => 'unexpected type',
            [['number', 'string'].includes(typeof v)]: () => v,
            [typeof v === 'boolean']: () => v.toString(),
            [typeof v === 'object']: () => (<JSONObject data={v} />),
            [Array.isArray(v)]: () => '<array>',
            [v === null]: () => 'null',
          }[true]()}
        </div>
      </div>
    ))}
  </div>
);

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
      <h1 className={styles.header}>{'{'} anotherJSONvalidator: "generator" {'}'}</h1>
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
            <JSONObject data={sourceDoc} />
          </pre>
        }
      </div>
      <div className={styles.rightPane}>
        <pre>
          {JSON.stringify(sourceDoc, true, 4)}
        </pre>
      </div>
    </main>
  )
});
