export function getVerificationSessionKey(email: string, flowType: string) {
  return `verification-security-token:${flowType}:${email.toLowerCase()}`;
}

export function saveVerificationSecurityToken(email: string, flowType: string, token: string) {
  if (!token) {
    return;
  }

  sessionStorage.setItem(getVerificationSessionKey(email, flowType), token);
}

export function getVerificationSecurityToken(email: string, flowType: string) {
  return sessionStorage.getItem(getVerificationSessionKey(email, flowType));
}
