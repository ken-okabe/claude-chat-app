module PromiseTimeline

open Fable.Core
open Timeline.Timeline
open Timeline.Nullable
open Timeline.TimelineNullable

let promiseToTimelineTask (promise: JS.Promise<'a>) : Timeline<NullableT<'a>> =
    let nullableTimeline = Timeline Null

    promise
        .``then``(fun result ->
                        nullableTimeline
                        |> nextTN (NullableT result)
                        |> ignore
                 )
    |> ignore

    nullableTimeline