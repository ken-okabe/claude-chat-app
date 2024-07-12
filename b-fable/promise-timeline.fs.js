import { Timeline } from "../a-libs/timeline/timeline.fs.js";
import { NullableT, NullableT$1 } from "../a-libs/timeline/x-nullable.fs.js";
import { nextTN } from "../a-libs/timeline/x-timeline-nullable.fs.js";

export function promiseToTimelineTask(promise) {
    const nullableTimeline = Timeline(new NullableT$1(0, []));
    promise.then((result) => {
        nextTN(NullableT(result), nullableTimeline);
    });
    return nullableTimeline;
}

