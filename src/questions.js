export const questions = [
    {
      question: "If Cov(X,Y) = 0, which statement is TRUE?",
      options: [
        "X and Y are independent",
        "X and Y are uncorrelated",
        "X and Y have no relationship",
        "X and Y have no linear relationship"
      ],
      answer: 1, // B
      difficulty: "medium",
      type: "logical reasoning"
    },
    {
        question: "The IQR (Interquartile Range) is resistant to outliers because it:",
        options: [
            "Uses all values in the dataset",
            "Only considers the middle 50% of values", // Corrected text from OCR
            "Is always positive", // Corrected text from OCR
            "Equals the mean minus the median" // Corrected text from OCR
        ],
        answer: 1, // B
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "A data scientist claims that a new algorithm reduces processing time. The null hypothesis would be:",
        options: [
            "The new algorithm reduces processing time",
            "The new algorithm increases processing time",
            "The new algorithm does not change processing time",
            "The new algorithm is better than the old one"
        ],
        answer: 2, // C
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "If a population has a variance of 225, what is the standard error of the mean for a sample size of 25?",
        options: [
            "9",
            "3",
            "45",
            "15"
        ],
        answer: 0, // A (Note: Calculation sqrt(225)/sqrt(25) = 15/5 = 3 suggests B is correct, but using provided answer A)
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "According to the Central Limit Theorem, as sample size increases, the sampling distribution of the sample mean:",
        options: [
            "Approximates a normal distribution",
            "Becomes more skewed",
            "Equals the population distribution",
            "Has increasing variance"
        ],
        answer: 0, // A
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "Two random variables X and Y have variances of 9 and 16 respectively, with a correlation coefficient of 0.5. What is their covariance?",
        options: [
            "6",
            "12",
            "4.5",
            "8.5"
        ],
        answer: 1, // B (Note: Calculation 0.5 * sqrt(9) * sqrt(16) = 6 suggests A is correct, but using provided answer B)
        difficulty: "medium",
        type: "aptitude"
    },
    {
        question: "What measure represents the middle value when data is arranged in ascending order?",
        options: [
            "Mean",
            "Median",
            "Mode",
            "Range"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "A point estimator is considered unbiased if:",
        options: [
            "It always equals the parameter being estimated",
            "Its expected value equals the parameter being estimated",
            "It has minimum variance",
            "It approaches the parameter as sample size increases"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "If adding 5 to each value in a dataset increases the mean by 5, how does it affect the standard deviation?",
        options: [
            "Increases by 5",
            "Decreases by 5",
            "Remains unchanged",
            "Increases by 25"
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "logical reasoning"
    },
    {
        question: "Which of the following affects the width of a confidence interval?",
        options: [
            "Sample size",
            "Confidence level",
            "Sample standard deviation",
            "All of the above"
        ],
        answer: 3, // D
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "In which sampling method does every possible sample of size n have an equal probability of being selected?",
        options: [
            "Convenience sampling",
            "Simple random sampling",
            "Stratified sampling",
            "Cluster sampling"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "The confidence level of an interval estimate represents:",
        options: [
            "The probability that the population parameter is in the interval",
            "The percentage of sample means falling within the interval",
            "The proportion of intervals that contain the population parameter when the sampling process is repeated",
            "The accuracy of the point estimate"
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "aptitude"
    },
    {
        question: "If Z = X + Y where X and Y are independent random variables with variances σ²x and σ²y respectively, what is Var(Z)?", // Corrected symbols
        options: [
            "σ²x + σ²y", // Corrected symbols
            "σ²x - σ²y", // Corrected symbols
            "σ²x × σ²y", // Corrected symbols
            "√(σ²x + σ²y)" // Corrected symbols
        ],
        answer: 0, // A
        difficulty: "medium",
        type: "logical reasoning"
    },
    {
        question: "What is the mode in a dataset?", // Question seems incomplete without a dataset, using provided answer context
        options: [
            "4",
            "6",
            "5.67",
            "No mode exists"
        ],
        answer: 3, // D
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "For independent random variables, which property is always true?",
        options: [
            "Their sum is normally distributed",
            "Their product equals zero",
            "E(XY) = E(X)E(Y)",
            "They must have the same variance"
        ],
        answer: 2, // C
        difficulty: "hard",
        type: "logical reasoning"
    },
    {
        question: "When using a normal distribution to approximate a binomial distribution, what continuity correction should be applied?",
        options: [
            "Add 0.5 to the value",
            "Subtract 0.5 from the value",
            "Either add or subtract 0.5, depending on whether we're calculating P(X ≤ x) or P(X ≥ x)",
            "No correction is needed"
        ],
        answer: 2, // C
        difficulty: "hard",
        type: "direct"
    },
    {
        question: "If two variables X and Y have a correlation coefficient of -0.9, this indicates:",
        options: [
            "A strong positive linear relationship",
            "A strong negative linear relationship",
            "A weak positive linear relationship",
            "No relationship"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "A researcher wants to estimate a population proportion with a margin of error of 0.04 at a 95% confidence level. If no prior information is available about the proportion, what minimum sample size should be used?",
        options: [
            "625",
            "600",
            "1200",
            "400"
        ],
        answer: 0, // A (Note: Calculation using Z=1.96 gives n=601, using Z=2 gives n=625. Using provided answer A)
        difficulty: "hard",
        type: "aptitude"
    },
    {
        question: "If data follows a perfect normal distribution, what is the relationship between mean, median, and mode?",
        options: [
            "Mean > Median > Mode",
            "Mean = Median = Mode",
            "Mean < Median < Mode",
            "No consistent relationship"
        ],
        answer: 1, // B
        difficulty: "medium",
        type: "logical reasoning"
    },
    {
        question: "A discrete random variable X follows a Poisson distribution with mean 16. For large values of the mean, which distribution can be used to approximate the Poisson distribution?",
        options: [
            "Uniform distribution",
            "Binomial distribution",
            "Normal distribution",
            "Exponential distribution"
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "The power of a statistical test is:",
        options: [
            "The probability of rejecting H₀ when it is true", // Type I error (alpha)
            "The probability of not rejecting H₀ when it is false", // Type II error (beta)
            "The probability of rejecting H₀ when it is false", // Power (1 - beta)
            "The probability of not rejecting H₀ when it is true" // Correct decision (1 - alpha)
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "When constructing a confidence interval for the difference between two population means with large independent samples, we need to know:",
        options: [
            "The population means",
            "The sample means and sample standard deviations",
            "The median of both populations",
            "The mode of both samples"
        ],
        answer: 1, // B
        difficulty: "medium",
        type: "direct"
    },
    {
        question: "A data scientist measures the heights of 100 trees and finds the distribution is heavily skewed right. Which measure of central tendency is most likely to give a misleading representation of a \"typical\" tree?",
        options: [
            "Median",
            "Mode",
            "Mean",
            "Interquartile range"
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "aptitude"
    },
    {
        question: "In hypothesis testing, a Type I error occurs when:",
        options: [
            "The null hypothesis is not rejected when it is false",
            "The null hypothesis is rejected when it is true",
            "The alternative hypothesis is true but rejected",
            "Both hypotheses are true"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "To decrease the margin of error in a 95% confidence interval by half, the sample size must be:",
        options: [
            "Doubled",
            "Halved",
            "Quadrupled",
            "Squared"
        ],
        answer: 2, // C
        difficulty: "medium",
        type: "logical reasoning"
    },
    {
        question: "According to the Law of Large Numbers, as the sample size increases indefinitely, the sample mean:",
        options: [
            "Equals the population variance",
            "Converges to the population mean",
            "Approaches zero",
            "Becomes less reliable"
        ],
        answer: 1, // B
        difficulty: "easy",
        type: "direct"
    },
    {
        question: "To test whether a coin is fair, 100 tosses are performed yielding 65 heads. Using a two-tailed test with α = 0.05, what would you conclude?",
        options: [
            "The coin is fair",
            "The coin is biased",
            "Need more data",
            "The test is invalid"
        ],
        answer: 1, // B (Calculation: Z = (0.65-0.5)/sqrt(0.5*0.5/100) = 3. |3| > 1.96, reject H0)
        difficulty: "hard",
        type: "aptitude"
    },
    {
        question: "A manufacturer produces batteries with lifetimes that follow a normal distribution with μ=500 hours and σ=30 hours. If 4 batteries are randomly selected, what is the probability that their mean lifetime is less than 485 hours?",
        options: [
            "0.1587",
            "0.3085",
            "0.0446",
            "0.0062"
        ],
        answer: 2, // C (Note: Calculation P(Z < (485-500)/(30/sqrt(4))) = P(Z < -1) ≈ 0.1587 suggests A. Using provided answer C)
        difficulty: "hard",
        type: "aptitude"
    },
    {
        question: "When comparing the means of two populations using large samples, if the variances are unknown but assumed equal, which distribution is used for the test statistic?",
        options: [
            "Normal distribution",
            "Chi-square distribution",
            "F-distribution",
            "t-distribution"
        ],
        answer: 0, // A (Note: For large samples, Z (Normal) is typically used even if variances unknown. t-dist converges to Z. Using provided answer A)
        difficulty: "hard",
        type: "direct"
    },
    {
        question: "If a hypothesis test yields a p-value of 0.03, which of the following conclusions is correct at α = 0.05?",
        options: [
            "Fail to reject the null hypothesis",
            "Reject the null hypothesis",
            "Accept the null hypothesis",
            "The test is inconclusive"
        ],
        answer: 1, // B (Since p-value 0.03 < alpha 0.05)
        difficulty: "medium",
        type: "logical reasoning"
    }
];