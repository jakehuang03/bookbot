from transformers import (
    TokenClassificationPipeline,
    AutoModelForTokenClassification,
    AutoTokenizer,
)
from transformers.pipelines import AggregationStrategy
import numpy as np


# Define keyphrase extraction pipeline
class KeyphraseExtractionPipeline(TokenClassificationPipeline):
    def __init__(self, model, *args, **kwargs):
        super().__init__(
            model=AutoModelForTokenClassification.from_pretrained(model),
            tokenizer=AutoTokenizer.from_pretrained(model),
            *args,
            **kwargs
        )

    def postprocess(self, all_outputs):
        results = super().postprocess(
            all_outputs=all_outputs,
            aggregation_strategy=AggregationStrategy.FIRST,
        )
        return np.unique([result.get("word").strip() for result in results])


def extract(text):
    model_name = "ml6team/keyphrase-extraction-distilbert-openkp"
    extractor = KeyphraseExtractionPipeline(model=model_name)
    keyphrases = extractor(text)
    return keyphrases


if __name__ == "__main__":
    # Load pipeline
    model_name = "ml6team/keyphrase-extraction-distilbert-openkp"
    extractor = KeyphraseExtractionPipeline(model=model_name)
    # Inference
    text = "what do the directors do?"

    keyphrases = extractor(text)

    print(keyphrases)
