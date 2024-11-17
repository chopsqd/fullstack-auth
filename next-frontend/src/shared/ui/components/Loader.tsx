import {LuLoader2} from 'react-icons/lu'

export function Loader() {
    return (
        <div className='flex items-center justify-center text-sm'>
            <LuLoader2 className='mr-2 size-5 animate-spin'/>
            Загрузка...
        </div>
    )
}
