import ReactQuill from "react-quill";

export default function Editor({value,onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="content">
        <ReactQuill
            className='w-full mb-3 bg-[#fff] border-2 border-gray-300 rounded-md'
            value={value}
            theme={'snow'}
            onChange={onChange}
            modules={modules}
        />
    </div>
  );
}