import { Timeline } from "./timeline.fs.js";
import { NullableT, NullableT$1 } from "./x-nullable.fs.js";
import { nextTN, bindTN } from "./x-timeline-nullable.fs.js";
import { uncurry2 } from "../../fable_modules/fable-library-js.4.19.3/Util.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    bindTN((arg) => {
        const _arg_1 = task(timelineResult, timelineStarter.lastVal);
        return Timeline(new NullableT$1(0, []));
    }, timelineStarter);
    return timelineResult;
}

export function taskConcat(task1, task2, timelineResult12, previousResult12) {
    taskT((timelineResult, previousResult) => {
        nextTN(previousResult, timelineResult12);
    }, taskT(task2, taskT(task1, Timeline(NullableT(previousResult12)))));
}

export function op_PlusGreater() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        taskConcat(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

