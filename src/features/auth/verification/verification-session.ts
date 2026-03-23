export function getVerificationSessionKey(email: string, flowType: string) {
  return `verification-security-token:${flowType}:${email.toLowerCase()}`;
}

export function saveVerificationSecurityToken(email: string, flowType: string, token: string) {
  if (!token) {
    return;
  }

  localStorage.setItem(getVerificationSessionKey(email, flowType), token);
  localStorage.setItem("x-security-token", token);
}

export function getVerificationSecurityToken(email: string, flowType: string) {
  // Try to get from specific key first, fallback to generic x-security-token
  return localStorage.getItem(getVerificationSessionKey(email, flowType)) || localStorage.getItem("x-security-token");
}
