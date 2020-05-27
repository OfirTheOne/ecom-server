import './pre-app-init';
// == 
import { Application } from '@o-galaxy/ether/core';
import { ApiModule } from '../api';

import { 
    CorsPipeline, 
    HelmetPipeline, 
    BodyParserPipeline, 
    ErrorPipeline,
    SwaggerUiPipeline, 
    NotFoundPipeline 
} from './app-pipeline';





@Application({
    pipelines: {
        onCreate: [
            HelmetPipeline, 
            BodyParserPipeline,
            CorsPipeline,
            SwaggerUiPipeline,
        ],
        afterRoutesInit: [
            NotFoundPipeline,
            ErrorPipeline,
        ]
    },
    modules: [
        ApiModule
    ]
})
export class App { }


    