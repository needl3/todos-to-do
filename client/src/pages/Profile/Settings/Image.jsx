import { useState } from 'react'
import { MdFileUpload } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import urls from '../../../utils/urls'
import { createPopup } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
import Processing from '../../Auth/Misc/Processing'

const uploadStatus = Object.freeze({
    UPLOADED: (
        <AiOutlineCheck
            className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#0009] w-full hover:bg-[#0003] duration-300 hover:cursor-pointer rounded-b-md "
            size="3em"
            color="aquamarine"
        />
    ),
    UPLOADING: (
        <Processing customClass="absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#0009] w-full hover:bg-[#0003] duration-300 hover:cursor-pointer rounded-b-md flex py-3 justify-center" />
    ),
    NOT_INITIATED: (
        <MdFileUpload
            className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#0009] w-full hover:bg-[#0003] duration-300 hover:cursor-pointer rounded-b-md "
            size="3em"
        />
    ),
})

export default function Image({ customClass }) {
    const [image, setImage] = useState(
        'https://thispersondoesnotexist.com/image'
    )
    const [uploadStatusIcon, setUploadStatusIcon] = useState(
        uploadStatus.NOT_INITIATED
    )
    const dispatch = useDispatch()

    function uploadImage(e) {
        setUploadStatusIcon(uploadStatus.UPLOADING)
        const imageData = new FileReader()
        imageData.readAsDataURL(e.target.files[0])
        imageData.onload = e => {
            console.log('Loaded')
            fetch(urls.image, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: e.target.result }),
            })
                .then(async r => {
                    if (r.status !== 200) throw r
                    const response = await r.json()
                    setImage(response.imageLink)
                    setUploadStatusIcon(uploadStatus.UPLOADED)
                    setTimeout(
                        () => setUploadStatusIcon(uploadStatus.NOT_INITIATED),
                        3000
                    )
                })
                .catch(async e => {
                    const response = await e.json()
                    dispatch(createPopup(response.message, false, 3000))
                    setUploadStatusIcon(uploadStatus.FAILED)
                    setTimeout(
                        () => setUploadStatusIcon(uploadStatus.NOT_INITIATED),
                        3000
                    )
                })
        }
        imageData.onerror = e => dispatch(createPopup(e), false, 3000)
    }

    return (
        <div className={customClass + ' relative'}>
            <img src={image} className="rounded-md" />
            <label htmlFor="image-input">{uploadStatusIcon}</label>
            <input
                id="image-input"
                type="file"
                className="hidden"
                onChange={uploadImage}
            />
        </div>
    )
}
