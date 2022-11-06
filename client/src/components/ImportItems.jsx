import './ImportItems.css'
import * as XLSX from 'xlsx';
import { useProducts } from '../context/productsContext';
import { useNavigate } from "react-router-dom";

function ImportItems() {
  const { setProducts } = useProducts(); 
  const navigate = useNavigate();
  
  const onDrop = ev => {
    ev.stopPropagation();
    ev.preventDefault();

    const files = ev.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  }

  const handleFileUpload = file => {
    console.warn(file);

    const name = file.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      const [columns, ...products] = data;
      navigate('/build');
      setProducts(products.map(pValues => Object.fromEntries(pValues.map((v, i) => [columns[i].toLowerCase(), v]))));
    };
    reader.readAsBinaryString(file);

  }

  const suppress = ev => {
    ev.stopPropagation();
    ev.preventDefault();
  }
  
  return (
    <div className="import">
      <h2 className="import__title">Your journey begins here!</h2>

      <div
        onDrop={onDrop}
        onDragEnter={suppress}
        onDragOver={suppress}
        className="import-drop-area"
      >
        <p>Simply <b>drag and drop</b> your Excel file{/*  or <b>upload one</b> */}.</p>
      </div>
    </div>
  )
}

export default ImportItems