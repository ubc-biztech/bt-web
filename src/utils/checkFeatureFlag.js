export const checkFeatureFlag = (flag) => {
  if (!flag) return true
  const featureSpecified = process.env[flag]
  return !!featureSpecified
}
