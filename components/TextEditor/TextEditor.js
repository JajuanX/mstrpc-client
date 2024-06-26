import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import styles from './textEditor.module.scss'

const MenuBar = () => {
	const { editor } = useCurrentEditor()

	if (!editor) {
		return null
	}

	return (
		<div className={styles.buttonContainer}>
			<button type='button'
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={
				!editor.can()
					.chain()
					.focus()
					.toggleBold()
					.run()
				}
				className={editor.isActive('bold') ? 'is-active' : ''}
			>
				bold
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={
				!editor.can()
					.chain()
					.focus()
					.toggleItalic()
					.run()
				}
				className={editor.isActive('italic') ? 'is-active' : ''}
			>
				italic
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={
				!editor.can()
					.chain()
					.focus()
					.toggleStrike()
					.run()
				}
				className={editor.isActive('strike') ? 'is-active' : ''}
			>
				strike
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={
				!editor.can()
					.chain()
					.focus()
					.toggleCode()
					.run()
				}
				className={editor.isActive('code') ? 'is-active' : ''}
			>
				code
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				bullet list
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				ordered list
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={editor.isActive('codeBlock') ? 'is-active' : ''}
			>
				code block
			</button>
			<button type='button'
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				blockquote
			</button>
			<button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
				horizontal rule
			</button>
			<button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
				highlight
			</button>
			<button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
				left
			</button>
			<button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
				center
			</button>
			<button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
				right
			</button>
			<button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
				justify
			</button>
		</div>
	)
}

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ types: [ListItem.name] }),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
	}),
]

const TextEditor = ({blog, setBlog}) => {

	const updateBlog = ({editor}) => {
		const JSON = editor.getJSON()
		setBlog(JSON)
	}

	return (
		<EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={blog} onUpdate={updateBlog}></EditorProvider>
	)
}

export default TextEditor;