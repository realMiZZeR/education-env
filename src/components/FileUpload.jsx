import React, { useEffect, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

import uploadFileIcon from '../assets/images/icons/upload_file.svg';

const fileTypes = ["JPG", "PNG", "GIF"];

const FileUpload = ({ context }) => {

    const { formValues, setFormValues } = context;

    const [ files, setFiles ] = useState([]);

    const fileHandler = (file) => {
        setFiles([
            ...files,
            file
        ]);
    }

    useEffect(() => {
        setFormValues({
            ...formValues,
            ['files']: files
        });
    }, [files]);

    return (
        <div className={`upload ${(files.length === 0) ? 'upload_empty' : ''}`}>
            {files.length > 0 && <h3 className='upload__heading'>Прикреплённые файлы</h3>}
            <FileUploader 
            handleChange={fileHandler} 
            name='file' 
            types={fileTypes}
            label='Перетащите файл сюда, чтобы загрузить'
            hoverTitle='Сюда!'
            maxSize='5'
            classes='upload-file'>
                {(files.length === 0) &&
                    <>
                        <div className='upload-file__image'>
                            <img src={uploadFileIcon} alt='Загрузить' />
                        </div>
                        <p className='upload-file__text'>Перетащите файл сюда, чтобы <span>загрузить</span></p>
                    </>
                }
                {(files.length > 0) &&
                <>
                    <ul className='files-list'>
                        {files.map((file, index) => {
                            return (
                                <li key={index} className='files-list__item'>
                                    <div className='files-list__image'>
                                        <img src={URL.createObjectURL(file)} />
                                    </div>
                                    <small className='files-list__name'>{file.name}</small>
                                </li>
                            )
                        })}
                    </ul>
                </>
                    
                }
            </FileUploader>
        </div>
    );
}

export default FileUpload;