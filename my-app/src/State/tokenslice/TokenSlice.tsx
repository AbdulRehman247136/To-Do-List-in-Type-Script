// tokenSlice.ts
export const tokenholder = (token: string) => {
    return {
      type: "SET_TOKEN",
      payload: token,
    } as const;
  };
  
  export const cleartoken = () => {
    return {
      type: "CLEAR_TOKEN" as const,
    } 
  };
  
  // State type
  interface AuthState {
    "access-token": string;
  }
  
  const initialState: AuthState = {
    "access-token": "",
  };
  
  // Action types
  type AuthAction = ReturnType<typeof tokenholder> | ReturnType<typeof cleartoken>;
  
  // Reducer
  export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "SET_TOKEN":
        return {
          ...state,
          "access-token": action.payload ?? "",
        };
      case "CLEAR_TOKEN":
        return {
          ...state,
          "access-token": "",
        };
      default:
        return state;
    }
  };
  
  // Optional: export action types
  export type ActionCreator = AuthAction;
  