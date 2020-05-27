import {App} from './app';

import { serve } from '@o-galaxy/ether/common';


const port = 3000;

serve(App, port,() => {
    console.log(`App listening on the port ${port}`);
});

/*
serve(App, port,
    () => {
        console.log(`App listening on the port ${port}`);
    }
);
*/