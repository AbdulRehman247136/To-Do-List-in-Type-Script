// tokenSlice.ts
export const tokenholder = (token: string, name:string) => {
    return {
      type: "SET_TOKEN" as const,
      payload: {token, name},
    } 
  };
  
  export const cleartoken = () => {
    return {
      type: "CLEAR_TOKEN" as const,
    } 
  };
  
  // State type
  interface AuthState {
    "access-token": string;
    name: string;
  }
  
  const initialState: AuthState = {
    "access-token": "",
    name:""
  };
  
  // Action types
  type AuthAction = ReturnType<typeof tokenholder> | ReturnType<typeof cleartoken>;
  
  // Reducer
  export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "SET_TOKEN":
        return {
          ...state,
          "access-token": action.payload.token ?? "",
          name: action.payload.name ?? "",
        };
      case "CLEAR_TOKEN":
        return {
          ...state,
          "access-token": "",
          name: "",
        };
      default:
        return state;
    }
  };
  
  // Optional: export action types
  export type ActionCreator = AuthAction;
  