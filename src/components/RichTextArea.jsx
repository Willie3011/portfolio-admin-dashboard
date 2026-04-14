import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

function RichTextArea({ value, setValue }) {
  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      theme='snow'
    />
  )
}

export default RichTextArea