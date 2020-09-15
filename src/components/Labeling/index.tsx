import React from 'react';
import Sidebar from '../Sidebar'
import ImageClassification from '../ImageClassification'
import Grid from "@material-ui/core/Grid";
import Sample from "../../model/sample";
import Config from "../../model/config";
import {styled} from "@material-ui/styles";


const ImageClassificationGrid = styled(Grid)({
    height: '100%'
})

const WorkspaceGrid = styled(Grid)({
    backgroundColor: '#eceff1',
    height: '100%',
})

type Props = {
    onPrev: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onNext: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onSelectSample : (index: number) => void,
    onLabelClick: (labels: Array<string>) => void,
    currentSample: Sample,
    samples: Array<Sample>,
    config: Config
    labeledInBatch: number,
}

const Labeling = (props: Props) => {
    return (
        <WorkspaceGrid
            container
            direction="row"
        >
            <ImageClassificationGrid
                item
                sm={9}
            >
                <ImageClassification
                    imageSrc={props.currentSample.src}/>
            </ImageClassificationGrid>
            <Grid
                item
                sm={3}>
                <Sidebar
                    key={props.currentSample.name}
                    labels={props.config.allowed_labels}
                    multiclass={props.config.multiclass}
                    selectedLabels={props.currentSample.labels}
                    onLabelClick={props.onLabelClick}
                    onSelectSample={props.onSelectSample}
                    onPrev={props.onPrev}
                    onNext={props.onNext}
                    onTeach={props.onTeach}
                    progress={computeProgress(props.labeledInBatch, props.samples)}
                    samples={props.samples}
                />
            </Grid>
        </WorkspaceGrid>
    )
}

const computeProgress = (labeledInBatch: number, samples: Array<Sample>): number => {
    return (labeledInBatch / samples.length) * 100;
}

export default Labeling;