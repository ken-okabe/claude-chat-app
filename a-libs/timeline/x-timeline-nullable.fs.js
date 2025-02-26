import { equals } from "../../fable_modules/fable-library-js.4.19.3/Util.js";
import { NullableT$1__get_Value, NullableT$1 } from "./x-nullable.fs.js";
import { singleton, append, iterate } from "../../fable_modules/fable-library-js.4.19.3/List.js";
import { Timeline } from "./timeline.fs.js";

export function nextTN(nullable, timeline) {
    timeline.lastVal = nullable;
    if (equals(nullable, new NullableT$1(0, []))) {
    }
    else {
        iterate((nullableFn) => {
            nullableFn(nullable);
        }, timeline._fns);
    }
    return timeline;
}

export function bindTN(monadf, timelineA) {
    const timelineB = equals(timelineA.lastVal, new NullableT$1(0, [])) ? Timeline(new NullableT$1(0, [])) : monadf(NullableT$1__get_Value(timelineA.lastVal));
    timelineA._fns = append(timelineA._fns, singleton((nullable) => {
        if (equals(nullable, new NullableT$1(0, []))) {
        }
        else {
            nextTN(monadf(NullableT$1__get_Value(nullable)).lastVal, timelineB);
        }
    }));
    return timelineB;
}

export function mapTN(f) {
    return (timelineA) => bindTN((arg) => Timeline(f(arg)), timelineA);
}

export function hasValue(timeline) {
    if (equals(timeline.lastVal, new NullableT$1(0, []))) {
        return false;
    }
    else {
        return true;
    }
}

