import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

const Icons = () => {
    return library.add(faCog, faFolderPlus);
}

export default Icons;
