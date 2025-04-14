export type InferGSPRTWorkup<T> =
  T extends Promise<readonly (infer U)[] | (infer U)[]> ? U : T;


/**
 * ### InferGSPRT &rarr; Infer Generate Static Params Return Type
 *
 * _params is asynchronously resolved (next.js versions  ≥15)_
 */
export type InferGSPRT<V extends (...args: any) => any> = {
  params: Promise<InferGSPRTWorkup<ReturnType<V>>>;
};
