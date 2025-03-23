// Simulated AI validation for complaints
// In a real application, this would connect to AI services like OpenAI, Google Cloud Vision, etc.

const validateText = async (text) => {
  // Check for spam or offensive content
  const spamKeywords = ["spam", "advertisement", "buy now", "free money"]
  const offensiveKeywords = ["offensive", "hate", "slur"]

  const containsSpam = spamKeywords.some((keyword) => text.toLowerCase().includes(keyword))

  const containsOffensive = offensiveKeywords.some((keyword) => text.toLowerCase().includes(keyword))

  if (containsSpam) {
    return {
      isValid: false,
      reason: "Text contains spam content",
    }
  }

  if (containsOffensive) {
    return {
      isValid: false,
      reason: "Text contains offensive content",
    }
  }

  return {
    isValid: true,
  }
}

const validateMedia = async (files) => {
  if (!files || files.length === 0) {
    return { isValid: true }
  }

  // In a real application, you would use AI services to check images/videos
  // For this example, we'll just check file types

  const invalidFiles = files.filter((file) => {
    const validImageTypes = ["image/jpeg", "image/png"]
    const validVideoTypes = ["video/mp4", "video/webm"]
    const validDocTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    return ![...validImageTypes, ...validVideoTypes, ...validDocTypes].includes(file.mimetype)
  })

  if (invalidFiles.length > 0) {
    return {
      isValid: false,
      reason: "Some files have invalid formats",
    }
  }

  return {
    isValid: true,
  }
}

const validateComplaint = async (text, files) => {
  // Validate text content
  const textValidation = await validateText(text)
  if (!textValidation.isValid) {
    return textValidation
  }

  // Validate media files
  const mediaValidation = await validateMedia(files)
  if (!mediaValidation.isValid) {
    return mediaValidation
  }

  // All validations passed
  return {
    isValid: true,
  }
}

module.exports = {
  validateComplaint,
  validateText,
  validateMedia,
}

