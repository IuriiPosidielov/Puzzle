import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    drfTokenCreate: build.mutation<
      DrfTokenCreateApiResponse,
      DrfTokenCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/drf/token/`,
        method: "POST",
        body: queryArg.authToken,
      }),
    }),
    jwtTokenCreate: build.mutation<
      JwtTokenCreateApiResponse,
      JwtTokenCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/jwt/token/`,
        method: "POST",
        body: queryArg.tokenObtainPair,
      }),
    }),
    jwtTokenRefreshCreate: build.mutation<
      JwtTokenRefreshCreateApiResponse,
      JwtTokenRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/jwt/token/refresh/`,
        method: "POST",
        body: queryArg.tokenRefresh,
      }),
    }),
    puzzlesRetrieve: build.query<
      PuzzlesRetrieveApiResponse,
      PuzzlesRetrieveApiArg
    >({
      query: () => ({ url: `/api/puzzles/` }),
    }),
    puzzlesCreate: build.mutation<
      PuzzlesCreateApiResponse,
      PuzzlesCreateApiArg
    >({
      query: (queryArg) => ({ url: `/api/puzzles/`, method: "POST", body: queryArg.data }),
    }),
    puzzlesUpdate: build.mutation<
      PuzzlesUpdateApiResponse,
      PuzzlesUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/puzzles/${queryArg.var}`,
        method: "PUT",
	body: queryArg.data
      }),
    }),
    puzzlesDestroy: build.mutation<
      PuzzlesDestroyApiResponse,
      PuzzlesDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/puzzles/${queryArg.var}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as puzzleApi };
export type DrfTokenCreateApiResponse = /** status 200  */ AuthToken;
export type DrfTokenCreateApiArg = {
  authToken: AuthToken;
};
export type JwtTokenCreateApiResponse = /** status 200  */ TokenObtainPair;
export type JwtTokenCreateApiArg = {
  tokenObtainPair: TokenObtainPair;
};
export type JwtTokenRefreshCreateApiResponse = /** status 200  */ TokenRefresh;
export type JwtTokenRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh;
};
export type PuzzlesRetrieveApiResponse = unknown;
export type PuzzlesRetrieveApiArg = void;
export type PuzzlesCreateApiResponse = unknown;
export type PuzzlesCreateApiArg = {
	data: PuzzleData;
};

export type PuzzleData = {
	Question: string;
	Answer: string;
}

export type PuzzlesUpdateApiResponse = unknown;
export type PuzzlesUpdateApiArg = {
  var: string;
  data: PuzzleData;
};
export type PuzzlesDestroyApiResponse = unknown;
export type PuzzlesDestroyApiArg = {
  var: string;
};
export type AuthToken = {
  username: string;
  password: string;
  token: string;
};
export type TokenObtainPair = {
  username: string;
  password: string;
  access: string;
  refresh: string;
};
export type TokenRefresh = {
  access: string;
  refresh: string;
};

export type CreatePair = {
	Question: string;
	Answer: string;
};

export const {
  useDrfTokenCreateMutation,
  useJwtTokenCreateMutation,
  useJwtTokenRefreshCreateMutation,
  usePuzzlesRetrieveQuery,
  usePuzzlesCreateMutation,
  usePuzzlesUpdateMutation,
  usePuzzlesDestroyMutation,
} = injectedRtkApi;
