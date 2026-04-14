import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'check',
  'blockquote', 'code-block',
  'link', 'image',
];

function RichTextArea({ value, setValue }) {
  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      theme='snow'
      modules={modules}
      formats={formats}
    />
  )
}

export default RichTextArea