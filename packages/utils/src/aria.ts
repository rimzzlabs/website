import { A, O, pipe, S } from "@mobily/ts-belt";

export function describedBy(ids: ReadonlyArray<string | false>) {
	return pipe(
		ids,
		A.filter((id): id is string => Boolean(id)),
		A.join(" "),
		O.fromPredicate(S.isNotEmpty),
		O.toUndefined,
	);
}
