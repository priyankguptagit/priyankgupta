export interface ResearchPaper {
  readonly id: string;
  readonly title: string;
  readonly publisher: string;
  readonly year: string;
  readonly authors: readonly string[];
  readonly abstract: string;
  readonly type: 'Article' | 'Book Chapter' | 'Conference Paper';
  readonly link: string;
  readonly articleLink?: string;
  readonly reads?: string;
  readonly citations?: string;
  readonly publicationDate?: string;
}

export const researchWorks: readonly ResearchPaper[] = [
  {
    id: 'stock-market-prediction-rnn-random-tuned-hyperparameters',
    title:
      'Stock Market Prediction using RNN-based Models with Random and Tuned Hyperparameters',
    publisher: 'International Journal of Computer Applications',
    year: '2023',
    publicationDate: 'July 2023',
    authors: ['Priyank Gupta', 'Sanjay Kumar', 'R. S. Jadon'],
    abstract:
      'This paper examines recurrent neural network (RNN)-based models for stock market prediction using both random and tuned hyperparameters. The study focuses on how model configuration influences forecasting performance and highlights the importance of hyperparameter optimization in sequence-based financial prediction. By comparing multiple RNN variants under different parameter settings, the research demonstrates that tuning hyperparameters can materially improve model effectiveness for market forecasting tasks. The work contributes to understanding the role of architecture design and configuration choices in predicting stock trends more reliably.',
    type: 'Article',
    link: 'https://www.researchgate.net/publication/372544804_Stock_Market_Prediction_using_RNN-based_Models_with_Random_and_Tuned_Hyperparameters',
    articleLink:
      'https://www.researchgate.net/publication/372544804_Stock_Market_Prediction_using_RNN-based_Models_with_Random_and_Tuned_Hyperparameters?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '38 Reads',
    citations: '4 Citations',
  },
  {
    id: 'stock-price-prediction-modified-bpso-feature-selection-rnn-variants',
    title:
      'Stock Price Prediction using Modified BPSO for Feature Selection with RNN Variants on Top Tech Companies',
    publisher: 'Conference Paper',
    year: '2023',
    publicationDate: 'July 2023',
    authors: ['Priyank Gupta', 'Nitin Paharia', 'Sanjay Kumar Gupta', 'R. S. Jadon'],
    abstract:
      'This conference paper explores stock price prediction using modified binary particle swarm optimization (BPSO) for feature selection with recurrent neural network (RNN) variants on top technology companies. The study examines how optimizing feature subsets can improve the performance of deep learning models for financial forecasting. By combining a modified BPSO-based selection mechanism with RNN architectures, the research addresses the challenge of identifying the most relevant predictive inputs while reducing noise and dimensionality. The work highlights the value of intelligent feature selection in improving the robustness and forecasting quality of sequential stock-price models.',
    type: 'Conference Paper',
    link: 'https://www.researchgate.net/publication/373666573_Stock_Price_Prediction_using_Modified_BPSO_for_Feature_Selection_with_RNN_Variants_on_Top_Tech_Companies',
    articleLink:
      'https://www.researchgate.net/publication/373666573_Stock_Price_Prediction_using_Modified_BPSO_for_Feature_Selection_with_RNN_Variants_on_Top_Tech_Companies?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '28 Reads',
    citations: undefined,
  },
  {
    id: 'aggregation-hybrid-bpso-bgwo-gru-indian-stock-index-price-prediction',
    title:
      'AGGREGATION AND HYBRID APPROACHES USING BPSO AND BGWO FOR FEATURE SELECTION FOR INDIAN STOCK INDEX PRICE PREDICTION USING GRU',
    publisher: 'International Journal of Engineering Applied Sciences and Technology',
    year: '2023',
    publicationDate: 'July 2023',
    authors: ['Priyank Gupta', 'Sanjay Kumar Gupta', 'R. S. Jadon'],
    abstract:
      'The stock exchange is a significant component of the economy, and forecasting its development is essential. Several deep-learning time-series models based on RNN variants are used to forecast the stock market, but their accuracy still needs to be improved. Optimization strategies such as GA, PSO, and GWO have been used to enhance the reliability of these models. This paper uses Binary GWO and Binary PSO algorithms to optimize the input characteristics of a two-layer GRU model for forecasting Indian stock index prices. To increase the accuracy of these models, two approaches are proposed: an aggregation method and a hybrid method. The results across a 10-year timeframe show that the aggregation approach outperformed standard Binary GWO and Binary PSO methods individually. Although the proposed hybrid method did not outperform individual Binary PSO methods in terms of accuracy, it performed better than the Binary GWO model over the same period and showed promise for future improvement. The proposed approaches can contribute meaningfully to stock price forecasting, particularly in the Indian market context.',
    type: 'Article',
    link: 'https://www.researchgate.net/publication/373813752_AGGREGATION_AND_HYBRID_APPROACHES_USING_BPSO_AND_BGWO_FOR_FEATURE_SELECTION_FOR_INDIAN_STOCK_INDEX_PRICE_PREDICTION_USING_GRU',
    articleLink:
      'https://www.researchgate.net/publication/373813752_AGGREGATION_AND_HYBRID_APPROACHES_USING_BPSO_AND_BGWO_FOR_FEATURE_SELECTION_FOR_INDIAN_STOCK_INDEX_PRICE_PREDICTION_USING_GRU?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '18 Reads',
    citations: undefined,
  },
  {
    id: 'comparative-study-machine-learning-models-stock-market-datasets',
    title:
      'Comparative Study of Machine Learning Models Implemented on Stock Market Datasets',
    publisher: 'Book Chapter',
    year: '2022',
    publicationDate: 'September 2022',
    authors: ['Priyank Gupta', 'Sakshi Talreja', 'R. S. Jadon', 'Sanjay Kumar Gupta'],
    abstract:
      'This chapter analyzes several machine learning algorithms, including k-nearest neighbor (KNN), linear regression, random forest (RF), and support vector regression (SVR), using stock market datasets for IT sector companies TCS and Wipro. The study evaluates the performance of each model using training accuracy, testing accuracy, RMSE, and K-fold validation results. The findings show that the accuracy of a model does not always improve simply with more data. Random forest emerges as the best-performing model among the algorithms considered. The work also discusses the value of ensemble approaches in improving overall prediction accuracy and demonstrates how model comparison can guide practical choices for stock market forecasting.',
    type: 'Book Chapter',
    link: 'https://www.researchgate.net/publication/363876439_Comparative_Study_of_Machine_Learning_Models_Implemented_on_Stock_Market_Datasets',
    articleLink:
      'https://www.researchgate.net/publication/363876439_Comparative_Study_of_Machine_Learning_Models_Implemented_on_Stock_Market_Datasets?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '114 Reads',
    citations: undefined,
  },
  {
    id: 'news-based-sentiment-analysis-tgwo-stock-price-prediction',
    title:
      'NEWS BASED SENTIMENT ANALYSIS USING TANH GREY WOLF OPTIMIZER (TGWO) FOR STOCK PRICE PREDICTION',
    publisher: 'International Journal of Engineering Applied Sciences and Technology',
    year: '2023',
    publicationDate: 'August 2023',
    authors: ['Priyank Gupta', 'Sanjay Kumar Gupta', 'R. S. Jadon'],
    abstract:
      'Research on stock market forecasting has always been important to the financial sector. Share price forecasting plays a significant role in raising investor interest and contributes to stock growth. With changing economic conditions and broader information flows, traditional analytical methods are often insufficient to capture hidden factors influencing stock movement. The study explores deep learning time-series models based on recurrent neural networks, including LSTM and GRU, and highlights the need for better optimization and information integration. It introduces a Tanh Grey Wolf Optimizer (TGWO) to improve the efficiency and accuracy of the forecasting model by constraining the search space to a more stable range. The study also integrates news sentiment analysis through word embeddings to improve prediction reliability. The final model combines time-series predictions with sentiment-derived scores and classifies outcomes into five categories: Strong Sell, Sell, Hold, Strong Buy, and Buy. This work demonstrates the value of combining optimization techniques with contextual news sentiment for stock-market prediction.',
    type: 'Article',
    link: 'https://www.researchgate.net/publication/374348681_NEWS_BASED_SENTIMENT_ANALYSIS_USING_TANH_GREY_WOLF_OPTIMIZER_TGWO_FOR_STOCK_PRICE_PREDICTION',
    articleLink:
      'https://www.researchgate.net/publication/374348681_NEWS_BASED_SENTIMENT_ANALYSIS_USING_TANH_GREY_WOLF_OPTIMIZER_TGWO_FOR_STOCK_PRICE_PREDICTION?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '25 Reads',
    citations: '2 Citations',
  },
  {
    id: 'adaptive-grey-wolf-optimization-stock-index-price-prediction',
    title:
      'Adaptive Grey Wolf Optimization Technique for Stock Index Price Prediction on Recurrent Neural Network Variants',
    publisher: 'International Journal on Recent and Innovation Trends in Computing and Communication',
    year: '2023',
    publicationDate: 'October 2023',
    authors: ['Priyank Gupta', 'Sanjay Kumar Gupta', 'R. S. Jadon'],
    abstract:
      'This paper proposes a Long Short-Term Memory (LSTM) and Adaptive Grey Wolf Optimization (GWO)-based hybrid model for predicting stock prices of major Indian stock indices such as Sensex. The LSTM is an advanced neural network capable of handling uncertain, nonlinear, and sequential data, but its performance depends strongly on effective weight and bias optimization. Classical backpropagation often suffers from local minima and overfitting. To address this, the study introduces an Adaptive GWO-based hybrid strategy to evolve LSTM weights and biases and improve the quality of the learned solution by ranking wolves adaptively. The approach is also applied to other recurrent neural network variants such as Bi-Directional LSTM, GRU, and Bi-Directional GRU. The proposed model is benchmarked against PSO-based hybrid LSTM, standard GWO, and Adaptive PSO approaches, and the findings demonstrate improved forecasting performance and stronger overall accuracy.',
    type: 'Article',
    link: 'https://www.researchgate.net/publication/375067988_Adaptive_Grey_Wolf_Optimization_Technique_for_Stock_Index_Price_Prediction_on_Recurring_Neural_Network_Variants',
    articleLink:
      'https://www.researchgate.net/publication/375067988_Adaptive_Grey_Wolf_Optimization_Technique_for_Stock_Index_Price_Prediction_on_Recurring_Neural_Network_Variants?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbH19',
    reads: '62 Reads',
    citations: '2 Citations',
  },
];
