import re
from typing import List

class Chunker:
    @staticmethod
    def estimate_tokens(text: str) -> int:
        words = text.split()
        return int(len(words) * 1.3)

    @classmethod
    def split_text(cls, text: str, target_tokens: int = 600, overlap_pct: float = 0.18) -> List[str]:
        # target_tokens matches 500-700 tokens request
        # overlap_pct matches 15-20% request
        
        paragraphs = text.split("\n\n")
        chunks = []
        
        overlap_tokens = int(target_tokens * overlap_pct)
        current_chunk_sentences = []
        current_chunk_tokens = 0
        
        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            
            # Split paragraphs into sentences
            sentences = re.split(r'(?<=[.!?])\s+', para)
            for sentence in sentences:
                sentence = sentence.strip()
                if not sentence:
                    continue
                
                sentence_tokens = cls.estimate_tokens(sentence)
                
                if sentence_tokens > target_tokens:
                    if current_chunk_sentences:
                        chunks.append(" ".join(current_chunk_sentences))
                        current_chunk_sentences = []
                        current_chunk_tokens = 0
                    
                    # Force split long sentences
                    words = sentence.split()
                    sub_chunk_word_count = int(target_tokens / 1.3)
                    sub_overlap_word_count = int(overlap_tokens / 1.3)
                    
                    w_idx = 0
                    while w_idx < len(words):
                        sub_words = words[w_idx : w_idx + sub_chunk_word_count]
                        chunks.append(" ".join(sub_words))
                        w_idx += sub_chunk_word_count - sub_overlap_word_count
                    continue
                
                if current_chunk_tokens + sentence_tokens > target_tokens:
                    if current_chunk_sentences:
                        chunks.append(" ".join(current_chunk_sentences))
                    
                    overlap_sentences = []
                    temp_tokens = 0
                    for s in reversed(current_chunk_sentences):
                        s_tok = cls.estimate_tokens(s)
                        if temp_tokens + s_tok <= overlap_tokens:
                            overlap_sentences.insert(0, s)
                            temp_tokens += s_tok
                        else:
                            break
                    
                    current_chunk_sentences = overlap_sentences + [sentence]
                    current_chunk_tokens = temp_tokens + sentence_tokens
                else:
                    current_chunk_sentences.append(sentence)
                    current_chunk_tokens += sentence_tokens
                    
        if current_chunk_sentences:
            chunks.append(" ".join(current_chunk_sentences))
            
        return chunks
