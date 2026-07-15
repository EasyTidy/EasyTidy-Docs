---
title: AI Services
description: Configure online and local AI models in EasyTidy Pro for classification, summarization, structured extraction, semantic models, and visual classification.
---

EasyTidy Pro's AI capabilities fall into three categories: LLM-based file processing, local Embedding semantic classification, and local visual model classification. Basic file organization does not depend on AI; if you don't use these features, you can skip all configuration on this page.

## Features & Prerequisites

| Feature | Primary Use | Prerequisites |
|---|---|---|
| AI Classification | Generate move, copy, and other organization plans based on natural language requirements or category labels | Default LLM; local Embedding model also required when deep semantic understanding is enabled |
| AI Summary | Extract file content, generate summaries, and output as PDF | Default LLM, content extraction component |
| Extract Structured Data | Extract data from documents by specified fields, output as JSON, CSV, or Excel | Default LLM, content extraction component |
| Smart Rule Assistant | Generate organization rules or advanced workflows from natural language | Default LLM; some capabilities require Pro |
| Visual Feature Classification | Template matching, automatic clustering, or text label classification based on image appearance | Local visual model; some modes require Pro |
| Deep Semantic Understanding | Recognize synonyms and context for improved text classification accuracy | Local Embedding model, Pro |
| Smart File Identification | Identify real file types by content, independent of file extension | Magika component |
| OCR & Document Parsing | Extract text from images, scanned PDFs, and other files | Content extraction component; MinerU is an optional cloud service |

::::caution[Know your data boundary first]
Online LLMs receive file names, extracted text, classification requirements, or other context needed to complete tasks. MinerU cloud OCR may upload complete files. EasyTidy Pro displays a privacy notice the first time an AI operation is added; please read the service provider's privacy policy and do not send sensitive data that should not leave your machine to remote services.
::::

## Preparing AI Components

Go to **Settings → Component Settings** and install or enable the following components as needed:

- **Smart File Identification**: Uses Google Magika to analyze file content and identify over 200 file types. The "Real File Type (AI)" condition requires this component.
- **Content Extraction**: Reads text from PDF, Word, Excel, images, and other files. AI Summary, structured extraction, and content-aware classification may use this component.

When a component is not installed, a file is corrupted, or the current format is unsupported, the app skips the corresponding analysis or falls back to basic information such as file names and extensions. Specific reasons can be found in the "Run Logs".

If cloud OCR is needed, configure it at **Integration Settings → MinerU**. When MinerU is enabled, it takes priority for parsing supported documents, falling back to available local OCR paths on failure or timeout.

## Configuring Large Language Models

Go to **Settings → AI Model Settings**. This page contains three areas: Model Configuration, Embedding Vector Models, and Visual Intelligence Classification.

### Supported Providers

EasyTidy Pro currently supports the following provider types:

| Type | Providers |
|---|---|
| Built-in Online Services | OpenAI, Alibaba Bailian, Hugging Face, Gemini, DeepSeek, Anthropic, Wenxin Yiyan, Azure OpenAI, Tencent Hunyuan, Volcano Engine, iFlytek Spark |
| Compatible Interfaces | OpenAI-compatible format, Anthropic-compatible format |
| Local Services | Ollama |
| Local Models | Phi-4-mini, Local ONNX models |

"OpenAI-compatible format" is for third-party services or self-hosted gateways implementing OpenAI-style APIs; "Anthropic-compatible format" is for proxies or relay services implementing the Anthropic Messages API. Compatibility does not guarantee all extended parameters are supported; the model must reliably return structured results as required by the task.

### Configuration Fields

| Field | Description |
|---|---|
| Display Name | Used only to distinguish configurations within EasyTidy Pro, e.g., "Local Ollama" or "Work DeepSeek" |
| Provider | Determines the API protocol, default endpoint, and which authentication fields to display |
| Model Identifier | The model name or deployment name used by the provider, e.g., the model name pulled in Ollama |
| Base URL | HTTP/HTTPS address for compatible interfaces, custom regions, remote Ollama, or proxy services |
| Application ID | Additional identifier required by providers such as Wenxin Yiyan, Tencent Hunyuan, Volcano Engine |
| API Key | API key for online services; not required for local Ollama, Phi-4-mini, or local ONNX models |
| Model Directory | Local directory containing the Phi-4-mini or ONNX GenAI model |
| Temperature | Controls output randomness, range 0 to 2; lower values recommended for classification and structured tasks |
| Default Model | The model used for default AI operations such as AI Classification, Summary, and Structured Extraction |

::::note[Service addresses]
Most built-in providers auto-fill default addresses. Alibaba Bailian, Azure OpenAI, Ollama, OpenAI-compatible format, and Anthropic-compatible format allow custom addresses. Region, deployment name, and path rules are determined by the respective service provider.
::::

### Adding and Setting a Default Model

1. Open **Settings → AI Model Settings**.
2. Expand "Model Configuration" and click <span class="fluent-icon fluent-icon--add" aria-hidden="true"></span> **New Model**.
3. Enter a display name and select a provider.
4. Fill in the model identifier, service address, and any authentication information required by the interface.
5. Set the temperature to a value appropriate for your task; classification tasks can start testing from `0.2` to `0.5`.
6. Check "Set this model as default", then save.
7. Create an AI Classification or AI Summary task on a small set of test files to confirm the connection and output are working correctly.

Multiple providers can be saved, but any operation that depends on an LLM requires a default model to exist. Before deleting the current default model, set another configuration as default first.

### Configuring Ollama

1. Install and start Ollama locally, confirming the service is accessible.
2. Use Ollama to pull the required model.
3. Select **Ollama** in EasyTidy Pro.
4. The base URL defaults to `http://localhost:11434`; enter the actual address for remote deployments.
5. The "Model Identifier" must match the model name in Ollama exactly.

Ollama itself does not require an API key, but remote reverse proxies may have additional authentication requirements. EasyTidy Pro's current Ollama configuration does not display an API Key field; for authenticated gateways, use an appropriate compatible interface type instead.

### Configuring Local ONNX Models

When selecting **Phi-4-mini** or **Local ONNX Model**, the interface will ask for a model directory and no longer requires a model identifier, service address, or API key.

- The model directory must be a complete model directory that can be directly loaded by ONNX Runtime GenAI, not a single `.onnx` file.
- Local models must use a directory structure loadable by ONNX Runtime GenAI and be compatible with the chat template used by the service; having only a plain ONNX file is not sufficient to run generation tasks.
- Local generation models typically require significant memory and disk space, and first-load latency may be noticeably higher than online APIs.
- Output quality of local models depends on model size. AI Classification and structured extraction require the model to strictly return structured content; smaller models may more frequently produce empty results or format errors.

## Configuring Embedding Vector Models

Embedding models convert file descriptions and category labels into vectors locally for "Deep Semantic Understanding". They can recognize semantically similar expressions like "invoice" and "receipt", and reduce the number of LLM calls per file.

Currently available models:

| Model | Language & Characteristics | Vector Dimension |
|---|---|---:|
| BGE-Small-ZH v1.5 | Optimized for Chinese; suitable for Chinese file classification | 512 |
| GTE-Small | Lightweight English model; recommended for English content only | 512 |
| MiniLM-L12-v2 | Multilingual general-purpose model; balanced size and performance | 384 |
| Piccolo-Base-ZH | Chinese model; higher dimensions | 768 |
| BCEmbedding | Cross-lingual retrieval and semantic matching | 512 |
| Qwen3-Embedding-0.6B | Multilingual, 1024-dim; higher quality but heavier resource usage | 1024 |

### Download & Enable

1. Open **Settings → AI Model Settings → Embedding Vector Models**.
2. Select a model based on your primary file language and device resources.
3. Click <span class="fluent-icon fluent-icon--download" aria-hidden="true"></span> **Download Model** and wait for the status to become "Ready".
4. Create an AI Classification task and enable "Deep Semantic Understanding".

Models are saved by default in the `models` folder under the program directory. The download process accesses Hugging Face; on failure, the app displays a manual download URL and target path. Both the main model and marked required auxiliary files must be placed in the indicated directory.

::::note[Relationship between Embedding and LLM]
Embedding inference runs locally, but it does not necessarily make the entire task fully offline. Pro multi-strategy classification prioritizes local vectors; low-confidence files may still be handed off to the configured default LLM for review. When no usable Embedding is configured, model loading fails, or "Force LLM" is selected, the task falls back to LLM classification.
::::

## Configuring Visual Intelligence Classification

Visual intelligence classification analyzes image content using local ONNX models, independent of file names. The following models are currently available:

| Model | Characteristics |
|---|---|
| DINOv3 ViT-S/16 | 384-dim image features; suitable for template matching and automatic clustering |
| SigLIP2 Base | 768-dim dual encoder for image and text; supports custom text labels |
| SigLIP2 Large | 1024-dim; higher accuracy, larger model |
| SigLIP2 SO400m | 1152-dim; highest resource usage |

### Three Classification Modes

- **Reference Template Directory**: Place sample images into subfolders by category — the subfolder names become classification labels. This mode requires Pro.
- **Automatic Clustering**: The system automatically groups similar images into different folders for easier browsing and management.
- **Classification Labels**: Enter text labels such as "contract, invoice, screenshot" and let SigLIP2 compare image-to-label similarity. This mode only applies to SigLIP2 models with a text tower and requires Pro.

Template directory example:

```text
D:\ImageTemplates\
├── Invoices\
│   ├── sample-01.jpg
│   └── sample-02.png
├── Screenshots\
│   └── sample-01.png
└── Landscapes\
    └── sample-01.jpg
```

### Enabling Steps

1. Open **Settings → AI Model Settings → Visual Intelligence Classification**.
2. Select and download a visual model; wait for the status to become "Ready".
3. Enable "Visual Semantic Recognition".
4. Select a classification mode.
5. When using template mode, add one or more template root directories and click <span class="fluent-icon fluent-icon--sync" aria-hidden="true"></span> **Update Features**.
6. When using automatic clustering, click <span class="fluent-icon fluent-icon--sync" aria-hidden="true"></span> **Update Auto-Clustering Cache**, or let the app generate the cache from the source directory at runtime.
7. In the task rules, select the "Visual Feature" condition and configure the mode, templates, or text labels.

When visual results fall below the threshold, the top two are too close, or the model cannot process the image, the app may use OCR-assisted judgment or place low-confidence items from automatic runs into "Pending Confirmation". Visual classification only processes readable images; corrupted files, permission issues, or unsupported formats are skipped.

## Using AI Classification

AI Classification first generates a file operation plan, which is then confirmed and executed by the user. The app validates AI-returned source paths, filters out non-existent files, and blocks unsafe paths.

### Creating a Classification Task

1. Go to **File Organization → Organize Tasks**, create or edit a task.
2. Set the source folder, basic matching rules, and target root directory.
3. Set the operation to **AI Classification**.
4. Choose an input method:
   - **Natural Language Description**: Directly describe categories, handling methods, and judgment criteria.
   - **Label Matching**: Enter multiple classification labels, confirm with Enter or comma.
5. If an Embedding model has been downloaded and you have the corresponding permissions, enable "Deep Semantic Understanding".
6. Save the task and run a preview.
7. In the AI Classification preview, review each item's classification rationale, operation type, and target path. Cancel unwanted items or directly modify suggestions.
8. Confirm and then execute the file operations.

Natural language example:

```text
Classify files into four categories: "Contracts", "Invoices", "Meeting Materials", and "Others".
Prioritize file content for judgment; place uncertain files in "Others" — do not delete any files.
```

Label matching example:

```text
Contracts, Invoices, Expense Reports, Project Plans, Others
```

::::caution[Must review the preview]
LLMs may misclassify items, suggest incorrect directories, or return incomplete results. The AI Classification preview allows modifying operations and target paths; for important files, use "Copy" first or verify in a test directory. Do not treat AI results as final decisions that require no review.
::::

### Classification Execution Paths

- When Pro multi-strategy classification is not enabled, or LLM is manually forced, the task uses the default LLM directly for classification.
- When deep semantic understanding is enabled, the app attempts local preprocessing, Embedding classification, and caching; low-confidence results are then reviewed by the LLM.
- When the Embedding model is unavailable, the task automatically falls back to the default LLM.
- When there is no default LLM and the task requires LLM fallback, the task prompts "Default AI service not configured".

## Using AI Summary

AI Summary first extracts file content locally, sends the text to be summarized to the default LLM, and then generates a PDF in the target directory.

1. Confirm the content extraction component is available and the default LLM is configured.
2. Create a new task and set the operation to **AI Summary**.
3. Select a built-in prompt or enter custom System Prompt and User Prompt.
4. Set the source files, target directory, and filter conditions.
5. Test with a single file first, checking logs and the generated PDF.

Output file names contain "AISummary", a timestamp, and the original file name. When text cannot be extracted, the model returns empty content, or the target directory is not writable, no valid summary file is generated.

## Extracting Structured Data

"Extract Structured Data" is suitable for extracting fixed fields from contracts, invoices, orders, or forms. Each source document produces one output file.

1. Create a new task and set the operation to **Extract Structured Data**.
2. Enter fields, e.g., "Customer Name, Order Number, Amount, Signing Date".
3. Select JSON, CSV, or Excel as the output format.
4. Choose an output directory; leave blank to output to the source file's directory.
5. For sensitive content, enable "Sanitize sensitive data before sending to AI".
6. Test field completeness and format with a small set of representative documents.

Sanitization replaces emails, phone numbers, ID numbers, and similar content with placeholders locally, and attempts to restore them in the extraction results. This option is off by default, as some extraction tasks require real field values. The free edition currently processes up to 5 files per run; excess files are skipped. Refer to the licensing policy displayed in the interface.

## Using the Smart Rule Assistant

"Generate Rules with AI" in advanced workflows can convert natural language into filter conditions and operation steps. For example:

```text
Copy PDF and Word documents from the Downloads folder modified in the last 7 days
to D:\Work\Recent, then create subdirectories by modification date.
```

The assistant first attempts local parsing; when local confidence is insufficient, it can use the selected LLM for enhancement. Generated results must be reviewed before applying. Multi-step requests may be converted into advanced workflows rather than individual organize tasks. This capability requires Pro authorization when marked with the Pro badge.

## Privacy, Costs & Local Execution

- **Online providers**: May receive file names, path segments, extracted text, prompts, and task context, and may incur service-side costs.
- **Ollama & Local ONNX**: Model inference can be completed locally; remote Ollama addresses still count as remote services.
- **Embedding & Visual models**: Inference and vector caching are performed locally; initial model download requires internet access and occupies additional disk space.
- **Magika**: Identifies real file types locally after the component is installed.
- **MinerU**: A cloud-based document parsing service; may upload complete files when enabled.
- **Updates & Licensing**: Even when AI inference is fully local, the app's update checks and license validation may still access the network.

API keys, tokens, model addresses, and logs may contain sensitive information. Before taking screenshots, exporting configurations, or submitting issues, remove keys, private paths, and file content.

## FAQ

### "Default AI service not configured"

Go to **Settings → AI Model Settings**, confirm at least one model has been saved, and set it as default either in the model list or the edit area. Downloading only Embedding or visual models does not substitute for a default LLM.

### Online model connection failed

Check in order: API key, model identifier, base URL, region or Azure deployment name, account balance, provider rate limiting, and system proxy. For compatible interfaces, also confirm the protocol type is correct: choose "OpenAI-compatible format" for OpenAI-style APIs, or "Anthropic-compatible format" for the Anthropic Messages API.

### Embedding or visual model download failed

First check disk space, write permissions for the program directory, and network connectivity. A download failure prompt provides the URL and save path; when downloading manually, keep the required file names and place both the main model and required auxiliary files in the same model directory. Re-enter the AI settings page to check the status once complete.

### AI Classification produces no results or everything goes to "Others"

Confirm the source files are actually matched by basic rules, the target directory is valid, and the classification description includes clear categories. Content-based classification also requires an available content extraction component. When using Embedding, check the model status, label language, and confidence; classification labels that are too similar also reduce differentiation.

### AI Summary or Structured Extraction produces no output

First check the "Run Logs" to see if text was successfully extracted. Scanned PDFs or images may require OCR; encrypted files, unsupported formats, empty content, unwritable target directories, or models not returning content as requested can all cause no output.

### Local models are slow or use high memory

The first model load is typically the slowest. Prefer smaller Embedding, visual, or generation models; reduce the batch file count; and avoid running multiple model-intensive tasks simultaneously. Qwen3 Embedding, SigLIP2 Large/SO400m, and large ONNX generation models have higher memory and CPU requirements.

For more on tasks, rules, and troubleshooting, see [Task Orchestration](/guide/task/), [Advanced Rules](/guide/filter/), and [FAQ](/faq/).
